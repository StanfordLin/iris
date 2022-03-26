import { useEffect } from 'react'
import { gql, useMutation } from '@apollo/client'
import { utils } from 'ethers'
import omitDeep from 'omit-deep'
import Button from './Button'
import Retweet from '../assets/Retweet'

const CREATE_MIRROR_TYPED_DATA = gql`
  mutation($request: CreateMirrorRequest!) { 
    createMirrorTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          MirrorWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        referenceModule
        referenceModuleData
      }
     }
   }
 }
`


function Mirror({ wallet, lensHub, profileId, publicationId }) {
    const [createMirrorTyped, createMirrorTypedData] = useMutation(CREATE_MIRROR_TYPED_DATA)

    const mirrorRequest = [
        {
            profileId: profileId,
            publicationId: publicationId,
            referenceModule: {
                followerOnlyReferenceModule: true
            }
        }
    ];
    
    const handleClick = async () => {
        createMirrorTyped({
            variables: {
                request: mirrorRequest,
            },
        });
    }
    
    useEffect(() => {
        if (!createMirrorTypedData.data) return
  
        const handleCreate = async () => {
            console.log(createMirrorTypedData.data)
            
            const typedData = createMirrorTypedData.data.createMirrorTypedData.typedData;
            const {domain, types, value} = typedData
    
            const signature = await wallet.signer._signTypedData(
                omitDeep(domain, '__typename'),
                omitDeep(types, '__typename'),
                omitDeep(value, '__typename')
            )

            const { v, r, s } = utils.splitSignature(signature);
            
            const tx = await lensHub.mirrorWithSig({
                profileId: typedData.value.profileId,
                profileIdPointed: typedData.value.profileIdPointed,
                pubIdPointed: typedData.value.pubIdPointed,
                referenceModule: typedData.value.referenceModule,
                referenceModuleData: typedData.value.referenceModuleData,
                sig: {
                  v,
                  r,
                  s,
                  deadline: typedData.value.deadline,
                },
              });
            console.log('create mirror: tx hash', tx.hash);
        }

        handleCreate()
    }, [createMirrorTypedData.data])


    return (
        <div>
            <Button onClick={handleClick}>
                <Retweet/>
            </Button>
        </div>
    )
}

export default Mirror